import { Alert, Button, Container, Group, LoadingOverlay, Paper, PasswordInput, TextInput } from '@mantine/core';
import { useState } from 'react';
import { AlertCircle } from 'tabler-icons-react';
import { login } from '@lfai/egeria-js-commons';

interface Props {
  loginCallback?: any;
}

export function EgeriaLogin(props: Props) {
  const { loginCallback } = props;

  const [username, setUsername] = useState({value: '', isValid: false, isPristine: true});
  const [password, setPassword] = useState({value: '', isValid: false, isPristine: true});
  const [errors, setErrors]: [any, any] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const validate = (field: any, value: any) => {
    if(value !== '') {
      return {
        ...field,
        value: value,
        isValid: true
      };
    } else {
      return {
        ...field,
        value: value,
        isValid: false
      };
    }
  }

  const handleSubmit = () => {
    setUsername({...validate({...username, isPristine: false}, username.value) });
    setPassword({...validate({...password, isPristine: false}, password.value) });

    if(username.isValid && password.isValid) {
      setIsLoading(true);

      login(username.value, password.value).then((response: any) => {
        const errors = [];

        if (!response.ok) {
          switch (response.status){
            case 401:
              errors.push('Wrong credentials!');
              break;
            case 403:
              errors.push('You are not authorized to access this application.');
              break;
            default:
              errors.push('Ops! Cannot authenticate right now.');
              break;
          }

          setErrors(errors);
          setIsLoading(false);
        } else {
          console.log('loginCallback');

          loginCallback();
        }
      });
    }
  };

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return <>
     <Container mt={100} size={420}>
       <Group align="center" className="egeria-logo">
         <img src="/egeria-logo.svg" style={{width:'80%', margin: '0 auto'}} alt="Egeria" title="Egeria" />
       </Group>

       <div style={{ width: 420, position: 'relative' }}>
         <LoadingOverlay visible={isLoading} />

         <Paper withBorder shadow="md" p={30} mt={30} radius="md">
           { errors.length > 0 && <Group mb={20}>
             <Alert style={{width:420}} icon={<AlertCircle size={16} />} title="Warning!" color="red">
               { errors.map((e: any, key: any) => <p key={key}>{e}</p>) }
             </Alert>
           </Group> }

           <TextInput
             label="Username"
             placeholder="Your username"
             required
             error={!username.isValid && !username.isPristine ? 'Field is required.' : ''}
             value={username.value}
             onKeyPress={handleKeyPress}
             onChange={(event) => setUsername({...validate({...username, isPristine: false}, event.currentTarget.value) }) } />

           <PasswordInput
             label="Password"
             placeholder="Your password"
             required
             error={!password.isValid && !password.isPristine ? 'Field is required.' : ''}
             mt="md"
             value={password.value}
             onKeyPress={handleKeyPress}
             onChange={(event) => setPassword({...validate({...username, isPristine: false}, event.currentTarget.value) }) } />

           <Button fullWidth mt="xl" onClick={() => handleSubmit()}>
             Sign in
           </Button>
         </Paper>
       </div>
     </Container>
  </>;
}
