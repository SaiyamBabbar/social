# Social Media Content Analyzer

The Social Media Content Analyzer is a web-based application designed to analyze text content from uploaded PDF documents and images. It extracts meaningful insights and provides suggestions for improving engagement based on the content's context.

---

## **Features**

### 1. **Document Upload**
- Supports uploading of both **PDF** and **image files** (e.g., scanned documents).
- Provides a **drag-and-drop interface** and a traditional file picker for easy uploads.

### 2. **Text Extraction**
- **PDF Parsing**: Extracts text while preserving the formatting.
- **OCR**: Utilizes **Tesseract.js** to extract text from images and scanned documents.

### 3. **Error Handling**
- Notifies users of unsupported file types or invalid input.
- Alerts for issues like incomplete uploads or corrupted files.

### 4. **User Experience**
- Includes **loading states** for feedback during file uploads and text extraction.
- Simple and intuitive UI for all users.

---

## **Technical Approach**

- **Frontend**: Built with **React** for a responsive and dynamic user interface.
- **Backend**: Node.js (with Express) manages text extraction and serves the processed results.
- **Libraries/Tools**: 
  - **PDF.js** for extracting text from PDFs.
  - **Tesseract.js** for OCR functionality.
  - **Tailwind CSS** for UI design.

---

## **Installation**

### Prerequisites
- Node.js and npm installed on your system.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/SaiyamBabbar/social-media-analyzer.git
   cd social-media-analyzer