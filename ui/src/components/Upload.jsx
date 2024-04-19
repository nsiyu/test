import React, { useState } from 'react';
import { Button, Spinner, useToast } from '@chakra-ui/react';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [buttonState, setButtonState] = useState('upload'); // States: 'upload', 'submit', 'loading', 'continue'
    const toast = useToast();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setButtonState('submit');
    };

    const handleSubmit = () => {
        if (!file) {
            toast({
                title: 'No file selected',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
            return;
        }
        setButtonState('loading');
        setTimeout(() => {
            setButtonState('continue');
            toast({
                title: 'File processed',
                description: "Your file has been successfully processed.",
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        }, 2000); // Simulate file processing time
    };

    const handleContinue = () => {
        toast({
            title: 'Continue',
            description: "You can now proceed.",
            status: 'info',
            duration: 2000,
            isClosable: true,
        });
    };

    return (
        <div>
            {buttonState === 'upload' && (
                <>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="file-upload"
                    />
                    <label htmlFor="file-upload">
                        <Button as="span" colorScheme="teal">
                            Upload File
                        </Button>
                    </label>
                </>
            )}
            {buttonState === 'submit' && (
                <Button colorScheme="blue" onClick={handleSubmit}>
                    Submit File
                </Button>
            )}
            {buttonState === 'loading' && (
                <Button isLoading spinner={<Spinner />} colorScheme="blue">
                    Processing...
                </Button>
            )}
            {buttonState === 'continue' && (
                <Button colorScheme="green" onClick={handleContinue}>
                    Continue
                </Button>
            )}
        </div>
    );
};

export default Upload;
