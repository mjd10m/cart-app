const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const createPoaPdf = require('./path/to/your/function'); // Adjust the path

jest.mock('fs'); // Mock the fs module

describe('createPoaPdf', () => {
  const existingPdfPath = './test-assets/sample.pdf'; // Replace with your sample PDF path
  const outputPdfPath = '/tmp/test-output.pdf'; // Temporary output
  const mockCustomer = {
    firstName: 'John',
    lastName: 'Doe',
    cartSize: 4,
    dob: '1980-01-01',
    addr1: '123 Main St',
    city: 'Orlando',
    state: 'FL',
    zip: '32801',
  };

  beforeEach(() => {
    // Mock the sample PDF bytes
    const samplePdfBytes = Buffer.from('Mock PDF content');
    fs.readFileSync.mockReturnValue(samplePdfBytes);
    fs.writeFileSync.mockImplementation(() => {}); // Mock writeFileSync
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should create a PDF with the correct modifications', async () => {
    // Act
    await createPoaPdf(existingPdfPath, outputPdfPath, mockCustomer);

    // Assert that readFileSync was called correctly
    expect(fs.readFileSync).toHaveBeenCalledWith(existingPdfPath);

    // Assert that writeFileSync was called with the correct path
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      outputPdfPath,
      expect.any(Buffer) // Check that a Buffer is written
    );

    // Assert that the PDF contains expected modifications
    const savedPdfBytes = fs.writeFileSync.mock.calls[0][1]; // Capture the saved PDF bytes
    const pdfDoc = await PDFDocument.load(savedPdfBytes);
    const page = pdfDoc.getPage(0);
    const textContent = page.getTextContent(); // Extract text to validate
    const text = textContent.items.map((item) => item.str).join(' ');

    expect(text).toContain('John Doe'); // Ensure customer name is added
    expect(text).toContain('123 Main St'); // Ensure address is added
    expect(text).toContain('1980'); // Ensure year from DOB is added
  });
});