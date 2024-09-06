export default function Footer(props: any) {
    const darkMode = props.darkMode;
    return (
        <div id="footer" className="pt-4">
            <hr />
            <footer className="p-3 text-xl font-semibold text-left"
            style={{
                color: darkMode ? "white" : "black"
            }}>2024 Lucas DePaola</footer>
        </div>
    )
}