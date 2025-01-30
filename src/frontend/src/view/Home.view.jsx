import {useNavigate} from "react-router";
import {Grid2, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import InstrumentCard from "../components/Instrument.card.jsx";

export default function HomeView() {
    let navigate = useNavigate();

    return (
        <Stack alignItems={'center'} spacing={4}>
            <Typography variant={'h4'}>Выберите инструмент:</Typography>
            <Grid2>
                <InstrumentCard onClick={() => navigate('/remove-pages')} name={'Удаление страниц'} description={'Удаление выбранных страниц из PDF файла'} />
            </Grid2>
        </Stack>
    )
}