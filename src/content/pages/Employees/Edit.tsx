import { Autocomplete, Button, Container, LinearProgress, Snackbar, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { PermissionMiddleware } from "src/middlewares/PermissionMiddleware";
import { Group } from "src/models/Group";
import { useRequests } from "src/utils/requests";

const EditEmployee = () => {
    const [requestLoading, setRequestLoading] = useState(true)
    const [infoMessage, setInfoMessage] = useState('')
    const [groupsData, setGroupsData] = useState<Group[]>([])
    const [groupsInput, setGroupsInput] = useState<Group[]>([])
    const [nameInput, setNameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const {id: employee_id} = useParams();
    const navigate = useNavigate()

    const {getGroups, getAnEmployee, editEmployee} = useRequests();

    const handleGetGroups = async () => {
        const response = await getGroups();

        if (!response.detail){
            setGroupsData(response.data.groups);
        }
    }

    const handleGetEmployee = async () => {
        const response = await getAnEmployee(Number(employee_id))

        if (!response.detail){
            setNameInput(response.data.name)
            setEmailInput(response.data.email)
            setGroupsInput(response.data.groups)
        }
    }

    const handleEditEmployee = async () => {
        const [name, email] = [nameInput, emailInput]
        const groups = groupsInput.map((group) => group.id).join(',')

        if(!name || !email){
            setInfoMessage('Preencha todos os campos');
            return;
        }

        setRequestLoading(true);
        const response = await editEmployee(Number(employee_id), {name, email, groups})
        setRequestLoading(false);

        if (response.detail){
            setInfoMessage(response.detail)
            return;
        }

        navigate('/employees');
    }

    useEffect(() => {
        Promise.resolve([handleGetEmployee(), handleGetGroups()]).finally(() => {
            setRequestLoading(false);
        })
    }, []);

    return (
        <PermissionMiddleware codeName="change_emplyee">
            <Helmet>
                <title>Editar Funcionário | Sistema de Gestão Empresarial</title>
            </Helmet>
            {requestLoading && <LinearProgress sx={{height: 2}} color="primary" />}
            <PageTitleWrapper>
                <PageTitle
                    heading="Editar um funcionário"
                    subHeading="Edite dados do funcionário e determine as atribuições do mesmo"
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
                    {groupsData.length >= 1 &&
                        <Autocomplete
                            multiple
                            options={groupsData}
                            getOptionLabel={(option: Group) => option.name}
                            value={groupsData.filter((groupData) => groupsInput.some(group => group.id == groupData.id))}
                            renderInput={(params) => (
                                <TextField 
                                    {...params}
                                    label="Cargos do funcionário"
                                    placeholder="Selecione"
                                />
                            )}
                            onChange={(e, value: Group[]) => setGroupsInput(value)}
                        />
                    }
                    <Button
                        variant="outlined"
                        sx={{width: 90, mt: 3.4}}
                        onClick={requestLoading ? () => null : handleEditEmployee}
                        disabled={requestLoading}
                    >
                        Editar
                    </Button>
                </Stack>
            </Container>
        </PermissionMiddleware>
    );
}

export default EditEmployee;