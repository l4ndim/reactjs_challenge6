import filesize from 'filesize';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import alert from '../../assets/alert.svg';
import FileList from '../../components/FileList';
import Header from '../../components/Header';
import Upload from '../../components/Upload';
import api from '../../services/api';
import { Container, Footer, ImportFileContainer, Title } from './styles';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    if(!uploadedFiles.length) return;
    
    const data = new FormData();

    data.append("file", uploadedFiles[0].file, uploadedFiles[0].name);

    try {
      await api.post('/transactions/import', data);

      history.push("/");
    } catch (err) {
      console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    const newFiles: FileProps[] = [];

    files.forEach(file => {
      newFiles.push({
        file,
        name: file.name,
        readableSize: filesize(file.size)
      })
    });

    setUploadedFiles(newFiles);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
