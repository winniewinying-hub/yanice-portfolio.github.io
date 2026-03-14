import fitz  # PyMuPDF
import io
import os
from PIL import Image

pdf_path = "docs/陈晓颖-UXUI作品集.pdf"
output_dir = "public/assets/extracted"

os.makedirs(output_dir, exist_ok=True)

# Open the PDF file
pdf_document = fitz.open(pdf_path)

# Iterate through pages
for page_num in range(len(pdf_document)):
    page = pdf_document.load_page(page_num)
    images = page.get_images(full=True)
    
    for img_index, img in enumerate(images):
        xref = img[0]
        base_image = pdf_document.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        # Load image with PIL to check dimensions
        try:
            image = Image.open(io.BytesIO(image_bytes))
            width, height = image.size
            
            # Filter out very small icons/logos - we want the meaty project images
            if width >= 400 and height >= 300:
                image_filename = f"page_{page_num+1}_img_{img_index+1}.{image_ext}"
                image_path = os.path.join(output_dir, image_filename)
                
                with open(image_path, "wb") as image_file:
                    image_file.write(image_bytes)
                print(f"Extracted {image_filename} ({width}x{height})")
        except Exception as e:
            print(f"Failed to process image on page {page_num+1}: {e}")

pdf_document.close()
print("Extraction complete.")
