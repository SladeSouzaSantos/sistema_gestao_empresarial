import MuiAlert from "@mui/material/Alert";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Card, Container, IconButton, InputAdornment, Snackbar, Stack, styled, TextField } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "src/utils/auth";
import { useNavigate } from "react-router";

const MainContent = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  flex: '1',
  overflow: 'auto',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}));

const SignIn = () => {
    const navigate = useNavigate();

    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const {handleSignIn} = useAuth();

    const handleSignInClickButton = async () => {
        try {
            if (emailInput == '' || passwordInput == '') {
                setSnackBarMessage('Por favor, preencha todos os campos.');
                return;
            }

            const requestSignIn = await handleSignIn(emailInput, passwordInput);
            if (requestSignIn.detail) {
                setSnackBarMessage('Email ou senha incorretos.');
                return;
            }

            navigate('/');
        } catch (error) {
            setSnackBarMessage('Erro ao fazer login. Verifique suas credenciais.');
        }
    };

    return (
        <>
            <Helmet>
                <title>Sign In | Sistema de Gestão Empresarial</title>
            </Helmet>
            <Snackbar
                open={snackBarMessage !== ''}
                autoHideDuration={6000}
                onClose={() => setSnackBarMessage('')}
                message={snackBarMessage}
            >
                <MuiAlert style={{color: 'whitesmoke'}} severity="error">
                    {snackBarMessage}
                </MuiAlert>
            </Snackbar>
            <MainContent>
                <Container maxWidth="sm">
                    <Card sx={{ textAlign: 'center', mt: 3, p: 4}}>
                        <Stack spacing={3}>
                            <TextField 
                                label="Email"
                                type="email"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                            />
                            <TextField 
                                label="Senha"
                                type={showPassword ? 'text' : 'password'}
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                variant="outlined"
                                style={{marginTop: 40}}
                                onClick={handleSignInClickButton}
                            >
                                Entrar
                            </Button>
                        </Stack>                        
                    </Card>
                    
                </Container>
            </MainContent>
        </>
    );
}

export default SignIn;