const PageHeading = ({ title, subtitle }) => {
    return (
        <>
            <h1 className="text-left text-bold text-3xl">{title}</h1>
            <p className="text-lg">{subtitle}</p>
        </>
    )
}

export default PageHeading;