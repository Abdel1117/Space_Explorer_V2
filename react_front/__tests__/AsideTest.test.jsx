import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Aside from '../src/componants/aside/Aside';

describe('Aside Component', () => {
    test('should set blockSection to the corresponding state on clicking list item', async () => {

        /* We mock the setState */
        const setBlockSection = vi.fn();
        const fakeData = { avatar: 'path/to/avatar', email: 'user@example.com', _id: '123', sex: 'M' };

        render(<Aside setBlockSection={setBlockSection} data={fakeData} />);


        const profilItem = screen.getByText('Profil');
        const AccueilItem = screen.getByText('Accueil');
        await userEvent.click(profilItem);
        expect(setBlockSection).toHaveBeenCalledWith('Profil');
        await userEvent.click(AccueilItem);
        expect(setBlockSection).toHaveBeenCalledWith('Accueil');


    });
});
