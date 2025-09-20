const PageHeading = ({ title, subtitle }) => {
    return (
        <>
            <h1 className="text 2xl">{title}</h1>
            <p className="text-lg">{subtitle}</p>
        </>
    )
}

export default PageHeading;