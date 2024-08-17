import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Text,
  useToast,
  Select,
  Progress,
} from '@chakra-ui/react';

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [file, setFile] = useState(null);
  const [transcriptionResult, setTranscriptionResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [outputFormat, setOutputFormat] = useState('txt');
  const [language, setLanguage] = useState('EN');
  const toast = useToast();

  const handleYoutubeUrlChange = (e) => {
    setYoutubeUrl(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!youtubeUrl && !file) {
      toast({
        title: 'Error',
        description: 'Please enter a YouTube URL or upload a file.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    setTranscriptionResult('Transcription in progress...');

    try {
      const formData = new FormData();
      if (youtubeUrl) {
        formData.append('youtube_url', youtubeUrl);
      } else {
        formData.append('file', file);
      }
      formData.append('language', language);
      formData.append('output_format', outputFormat);

      const response = await axios.post('/api/transcribe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setTranscriptionResult(response.data.transcription);
    } catch (error) {
      console.error('Error during transcription:', error);
      toast({
        title: 'Error',
        description: 'An error occurred during transcription. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setTranscriptionResult('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.xl" py={5}>
      <VStack spacing={6}>
        <Heading as="h1" size="xl">Transcribe Tool</Heading>

        <Box width="100%" p={5} borderWidth={1} borderRadius="lg">
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>YouTube URL</FormLabel>
              <Input
                placeholder="Enter YouTube URL"
                value={youtubeUrl}
                onChange={handleYoutubeUrlChange}
                disabled={isLoading}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Upload File</FormLabel>
              <Input
                type="file"
                onChange={handleFileChange}
                disabled={isLoading}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Language</FormLabel>
              <Select value={language} onChange={(e) => setLanguage(e.target.value)} disabled={isLoading}>
                <option value="EN">English</option>
                <option value="AR">Arabic</option>
                <option value="FR">French</option>
                <option value="JA">Japanese</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Output Format</FormLabel>
              <Select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} disabled={isLoading}>
                <option value="txt">TXT</option>
                <option value="srt">SRT</option>
              </Select>
            </FormControl>

            <Button colorScheme="blue" onClick={handleSubmit} isLoading={isLoading}>
              Transcribe
            </Button>
          </VStack>
        </Box>

        {isLoading && <Progress size="xs" isIndeterminate width="100%" />}

        <Box width="100%" p={5} borderWidth={1} borderRadius="lg">
          <Heading as="h2" size="md" mb={4}>Transcription Results</Heading>
          <Text whiteSpace="pre-wrap">{transcriptionResult || 'Your transcription will appear here.'}</Text>
        </Box>
      </VStack>
    </Container>
  );
}

export default App;
