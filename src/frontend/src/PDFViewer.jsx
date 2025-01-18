import {useEffect, useRef} from 'react';
import * as pdfjs from "pdfjs-dist";

// Настройка пути к воркеру PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.17.0/pdf.worker.min.js`;

const PDFViewer = ({pdfBuffer}) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const renderPDF = async (buffer) => {
            const pdf = await pdfjs.getDocument({data: buffer}).promise; // Загружаем PDF
            const page = await pdf.getPage(1); // Получаем первую страницу

            const viewport = page.getViewport({scale: 1.5}); // Масштаб
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };

            await page.render(renderContext).promise; // Рендеринг страницы
        };

        renderPDF(pdfBuffer).catch(console.error);
    }, [pdfBuffer]);

    return <canvas ref={canvasRef}></canvas>;
};

export default PDFViewer;