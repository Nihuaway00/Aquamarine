import './App.css'

import {Button, Stack} from '@mui/material';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {removePages} from "./queries.js";
import PDFViewer from "./PDFViewer.jsx";

function App() {
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


    return (
        <>
            <Stack>
                {
                    mutation.isSuccess && !!mutation.data ? (
                        <Stack>
                            <h1>PDF Viewer</h1>
                            <PDFViewer pdfBuffer={mutation.data}/>
                        </Stack>
                    ) : null
                }

                <Button onClick={() => mutation.mutate({
                    file: null,
                    pagesToRemove: [3, 1, 2]
                })}>ffff</Button>
            </Stack>
        </>
    )
}

export default App
