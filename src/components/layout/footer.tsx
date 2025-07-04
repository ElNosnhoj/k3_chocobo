/**=====================================================================
 * file: components/layout/footer.tsx
 * desc: footer componenet used for most of the app
 *=====================================================================*/

const Footer = ({name}:{name?: string}) => {
    return (
        <footer className="bg-background text-center p-4 text-foreground/66 text-sm whitespace-pre">
            {/* {name&&<p>Logged in as: {name}</p>} */}
            <p> {name && `Logged in as: ${name}`} </p>
            <p>&copy; 2023 Chocobo App. All rights reserved.</p>
        </footer>
    )
}

export default Footer;
