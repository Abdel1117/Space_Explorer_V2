import Galerie from "../src/pages/Galerie/Galerie"
import { render, screen, fireEvent } from '@testing-library/react';
// Mock API response
const mockApiResponse = [
    { image: 'image1.jpg', imageDesc: 'Image 1' },
    { image: 'image2.jpg', imageDesc: 'Image 2' }
];

beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
        json: () => Promise.resolve(mockApiResponse),
    });
});

afterEach(() => {
    vi.restoreAllMocks();
});

// Mocking react-modal-image component
vi.mock('react-modal-image', () => ({
    __esModule: true,
    default: ({ small, large, alt }) => (
        <div data-testid="modal-image">
            <img src={small} alt={alt} />
        </div>
    ),
}));


describe("Galerie", () => {
    it("render Galerie page with image", async () => {
        render(<Galerie />)
        const galerieElement = screen.getAllByText("Galerie")
        expect(galerieElement.length).toBeGreaterThan(0);

        // API call mocked
        expect(fetch).toHaveBeenCalledTimes(1);

        // Wait for images to be loaded
        const images = await screen.findAllByAltText(/^Image \d$/);
        expect(images.length).toBe(2); // Assuming there are only two images
    })

    it('renders modal image when an image is clicked', async () => {
        render(<Galerie />);
        await screen.findByAltText('Image 1');
        const images = screen.getAllByAltText(/^Image \d$/);
        fireEvent.click(images[0]); // Click on the first image

        const modalImage = screen.getByAltText('Image 1');
        expect(modalImage).toBeInTheDocument();
    });
});
