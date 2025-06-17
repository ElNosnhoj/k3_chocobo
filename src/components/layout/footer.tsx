/**=====================================================================
 * file: components/layout/footer.tsx
 * desc: footer componenet used for most of the app
 *=====================================================================*/

const Footer = async ({name}:{name?: string}) => {
    return (
        <footer className="bg-gray-200 text-center p-4 text-gray-600 text-sm">
            {name&&<p>Logged in as: {name}</p>}
            <p>&copy; 2023 Chocobo App. All rights reserved.</p>
        </footer>
    )
}

export default Footer;
