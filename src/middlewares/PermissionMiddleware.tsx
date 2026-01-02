import { Box, Button, Container, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "src/utils/auth";

type Props = {
    children?: ReactNode;
    codeName: string;
}

export const PermissionMiddleware = ({children, codeName}: Props) => {
    const navigate = useNavigate();

    const { handlePermissionExists } = useAuth();

    const handleRefreshPage = () => {
        navigate(0);
    }

    if (!handlePermissionExists(codeName)) {
        return (
            <Container maxWidth="sm" sx={{ mt: 16 }}>
                <Box textAlign="center">
                  <img
                    alt="status-500"
                    height={260}
                    src="/static/images/status/500.svg"
                  />

                  <Typography variant="h3" sx={{my: 2}}>
                    Você não tem permissão para acessar essa área.
                  </Typography>

                  <Typography color='text.secondary' sx={{mb: 4}}>
                    Se você solicitou à administração a permissão para acessar essa área, clique no botão abaixo!
                  </Typography>

                  <Button variant="contained" sx={{ml: 1}} onClick={handleRefreshPage}>
                    Atualizar Página
                  </Button>
                </Box>
            </Container>
        );
    }

    return(
        <>
            {children}
        </>
    );
}