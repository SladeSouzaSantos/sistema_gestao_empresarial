import { Button, Container, LinearProgress, Snackbar, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { PermissionMiddleware } from "src/middlewares/PermissionMiddleware";
import { useRequests } from "src/utils/requests";

const AddEmployee = () => {
    const [requestLoading, setRequestLoading] = useState(false)
    const [infoMessage, setInfoMessage] = useState('')
    const [nameInput, setNameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const navigate = useNavigate()

    const {addEmployee} = useRequests();

    const handleAddEmployee = async () => {
        const [name, email, password] = [nameInput, emailInput, passwordInput]

        if(!name || !email || !password){
            setInfoMessage('Preencha todos os campos');
            return;
        }

        setRequestLoading(true);
        const response = await addEmployee({name, email, password})
        setRequestLoading(false);

        if (response.detail){
            setInfoMessage(response.detail)
            return;
        }

        navigate('/employees');
    }

    return (
        <PermissionMiddleware codeName="add_employee">
            <Helmet>
                <title>Adicionar Funcionário | Sistema de Gestão Empresarial</title>
            </Helmet>
            {requestLoading && <LinearProgress sx={{height: 2}} color="primary" />}
            <PageTitleWrapper>
                <PageTitle
                    heading="Adicionar um funcionário"
                    subHeading="Adicione um funcionário e defina a senha do mesmo"
                />
            </PageTitleWrapper>
            <Snackbar 
                open={infoMessage != ""}
                onClose={() => setInfoMessage('')}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                message={infoMessage}
            />
            <Container>
                <Stack maxWidth={700} spacing={3}>
                    <TextField
                        fullWidth
                        label="Nome do funcionário *"
                        value={nameInput}
                        onChange={e => setNameInput(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="E-mail do funcionário *"
                        value={emailInput}
                        onChange={e => setEmailInput(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Senha do funcionário *"
                        value={passwordInput}
                        onChange={e => setPasswordInput(e.target.value)}
                    />
                    <Button
                        variant="outlined"
                        sx={{width: 90, mt: 3.4}}
                        onClick={requestLoading ? () => null : handleAddEmployee}
                        disabled={requestLoading}
                    >
                        Adicionar
                    </Button>
                </Stack>
            </Container>
        </PermissionMiddleware>
    );
}

export default AddEmployee;