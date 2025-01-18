import './App.css'

import {Button, Link, Stack} from '@mui/material';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {removePages} from "./queries.js";
import InputFileUpload from "./components/InputFIleUpload.jsx";
import {useEffect, useState} from "react";

function App() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState(null);
    // Access the client

    const queryClient = useQueryClient()

    // Queries
    // Mutations
    const mutation = useMutation({
        mutationFn: removePages,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({queryKey: ['pdf']})
        },
    })

    // useEffect(() => {
    //     if(mutation.isSuccess && !!mutation.data){
    //         const blob = new Blob([mutation.data], {type: 'application/pdf'});
    //         const url = URL.createObjectURL(blob);
    //         setDownloadUrl(url);
    //     }
    // }, [mutation.data]);

    return (
        <>
            <Stack>
                {
                    downloadUrl ? (
                        <Stack>
                            <h1>Ваш файл готов</h1>
                            <Link href={downloadUrl}>Скачать</Link>
                        </Stack>
                    ) : null
                }
                {
                    uploadedFile ? <h4>{uploadedFile.name}</h4> : <h4>Пусто</h4>
                }
                <InputFileUpload disabled={!!uploadedFile} onFileUploaded={(e) => setUploadedFile(e.target.files[0])}/>
                <Button onClick={() => {
                    let reader = new FileReader();
                    reader.readAsArrayBuffer(uploadedFile);
                    reader.onload = () => {
                        mutation.mutate({
                            file: uploadedFile,
                            pagesToRemove: [1]
                        })
                    }
                }}>ffff</Button>
            </Stack>
        </>
    )
}

export default App
