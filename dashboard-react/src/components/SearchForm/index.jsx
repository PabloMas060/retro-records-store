import { Formik, Field, ErrorMessage } from 'formik';
import { Form, Button } from "react-bootstrap";
import * as Yup from 'yup';
import styles from './index.module.css';
import useMusic from '../../hooks/useMusic';

export const SearchForm = () => {

    const { getData } = useMusic();

    const initialValues = {
        name: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Ingresá un artista o canción'),
    });

   const handleSubmit = (values) => {
    console.log("Buscando:", values.name)
    getData(values.name)
}

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {(formik) => (

                <Form
                    onSubmit={formik.handleSubmit}
                    className={styles.formEdition}
                >

                    <Field
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Buscar artista, canción o álbum..."
                        as={Form.Control}
                        className={styles.formInput}
                    />

                    <ErrorMessage
                        name="name"
                        component="div"
                        className={styles.errorMessageForm}
                    />

                    <Button
                        className={styles.buttonSubmit}
                        type="submit"
                    >
                        Buscar
                    </Button>

                </Form>
            )}
        </Formik>
    );
};