import * as React from 'react';
import {useEffect, useState} from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {removePages} from "../requests.js";
import {Input, Stack, Typography} from "@mui/material";
import InputFileUpload from "../components/InputFIleUpload.jsx";
import Button from "@mui/material/Button";

export default function RemovePagesView() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [pagesToRemove, setPagesToRemove] = useState('');
    const [downloadLink, setDownloadLink] = useState('');
    const [inputError, setInputError] = useState(false);
    const [fileSending, setFileSending] = useState(false);
    const [sendingError, setSendingError] = useState(undefined);

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: removePages,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({queryKey: ['pdf']})
        },
    })

    useEffect(() => {
        if (mutation.isPending) {
            setFileSending(true);
        } else if (mutation.isError) {
            setFileSending(false);
            setSendingError(mutation.error);
        } else if (mutation.isSuccess && mutation.data) {
            setDownloadLink(mutation.data)
            setFileSending(false);
            setSendingError(undefined);
        } else if (mutation.isSuccess && !mutation.data) {
            setFileSending(false);
            setSendingError('Unknown error')
        }
    }, [mutation.status])

    function handleUploadedFile(e) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(uploadedFile);
        reader.onload = () => {
            mutation.mutate({
                file: uploadedFile,
                pagesToRemove: [1]
            })
        }
    }


    useEffect(() => {
        validateInput(pagesToRemove)
    }, [pagesToRemove])

    function validateInput(value) {
        const regex = /^(\d+)(,\s*\d+)*$/;
        const isValid = regex.test(value) && value.split(',').every(num => parseInt(num) > 0 && Number.isInteger(parseFloat(num)));
        setInputError(!isValid);
    }

    function sendFile() {
        let reader = new FileReader();
        reader.readAsArrayBuffer(uploadedFile);
        reader.onload = () => {
            mutation.mutate({
                file: uploadedFile,
                pagesToRemove: pagesToRemove.split(',').map(num => parseInt(num))
            })
        }
    }

    return (
        <Stack spacing={3}>
            <InputFileUpload onFileUploaded={(e) => setUploadedFile(e.target.files[0])}/>
            {
                uploadedFile ? (
                    <>
                        <Typography>{uploadedFile.name}</Typography>
                        <Input error={inputError} placeholder={'1,5,2, ...'} value={pagesToRemove}
                               onChange={(e) => setPagesToRemove(e.target.value)} type="text"/>
                        {
                            downloadLink ? (
                                <Button variant={'outlined'} href={downloadLink}>Скачать</Button>

                            ) : (
                                <Button loading={fileSending} disabled={sendingError} onClick={sendFile}>Удалить
                                    страницы</Button>
                            )
                        }

                    </>

                ) : null
            }
            {
                sendingError ? <p>{JSON.stringify(sendingError)}</p> : null
            }
        </Stack>
    )
}
