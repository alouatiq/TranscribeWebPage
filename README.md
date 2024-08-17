# Audio and Video Transcription Tool

This Python script allows you to transcribe audio and video files using the Wit.ai API. It supports transcription of YouTube videos, local audio files (WAV and MP3), and local video files (MP4, MKV, AVI).

## Features

- Transcribe YouTube videos by providing the video link
- Transcribe local audio files in WAV or MP3 format
- Transcribe local video files in MP4, MKV, or AVI format
- Automatically convert MP3 files to WAV format for transcription
- Automatically extract audio from video files for transcription
- Support for multiple languages (requires Wit.ai API key for each language)
- Generate transcriptions in TXT and SRT formats

## Requirements

- Wit.ai API key for each language you want to transcribe
- Docker (if using the Docker setup).
if not using Docker:
- Python 3.x
- ffmpeg
- yt-dlp
- tafrigh library (pip install "tafrigh[wit]")
- ffmpeg-python library
- pydub (install this if you get an error)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/aloautiq/TranscribeWebPage.git
```
### Running with Docker (Recommended)

2. Build the Docker image:
```bash
cd transcribe
docker build -t transcribe-app .
```
3. Run the Docker container, mounting the local `downloads` directory:
```bash
docker run -it --rm -v $(pwd)/downloads/:/usr/src/app/downloads transcribe-app
```
Replace `$(pwd)/downloads/` with the path to your local `downloads` directory you wish to use for saving the transcription results. This ensures that any files downloaded or created by the script will be accessible on your host machine.

### Running Locally

2. Install the required Python packages:
   3. Install ffmpeg:

- For Windows:
  - Download the ffmpeg build from the official website: [ffmpeg.org](https://ffmpeg.org/download.html)
  - Extract the downloaded archive and add the `bin` directory to your system's PATH environment variable.

- For macOS (using Homebrew):
  ```
  brew install ffmpeg
  ```

- For Linux (using apt):
  ```
  sudo apt update
  sudo apt install ffmpeg
  ```

4. Install yt-dlp:

- For Windows:
  ```
  pip install yt-dlp
  ```

- For macOS and Linux:
  ```
  sudo pip install yt-dlp
  ```

5. Set up the environment variables:

- Copy the `.env.example` file to a new file named `.env` in the root directory of your project.
- Open the `.env` file and replace the placeholder values with your actual Wit.ai API keys and any other necessary configuration values.

Note: The `.env` file is where your sensitive information such as API keys will be stored. It is crucial to ensure this file is never committed to your version control system. The `.gitignore` file in this project is already configured to exclude `.env`.

6. Set up Wit.ai API keys:

- Sign up for a Wit.ai account at [wit.ai](https://wit.ai/) if you don't have one.
- Create a new app for each language you want to transcribe.
- Obtain the API key for each language.
- Open your `.env` file and fill in your Wit.ai API keys next to the corresponding language variables (e.g., `WIT_API_KEY_ENGLISH`, `WIT_API_KEY_ARABIC`, etc.).


## Windows Release

For Windows users, a pre-packaged release is available that includes the necessary executable files (ffmpeg and yt-dlp) along with the Python script. You can download the release from [here](https://github.com/marouane53/transcribe/releases/download/windows_py/Transcribe.zip).

The release version eliminates the need for installing ffmpeg and yt-dlp separately, as the executable files are included in the package. Simply extract the ZIP file and run the script directly.


## Usage

1. Run the script:
   python transcribe.py
2. Choose whether you want to transcribe a YouTube video or a local file.

3. Follow the prompts to provide the necessary information (YouTube link or file path, language sign).

4. The script will download the audio (for YouTube videos), convert the file to WAV format (if necessary), and start the transcription process.

5. Once the transcription is completed, the generated files (TXT and SRT) will be saved in the same directory as the input file.

## Acknowledgments

This project was inspired by and adapted from the [Tafrigh](https://github.com/ieasybooks/tafrigh) project.

## License

This project is licensed under the [MIT License](LICENSE).
