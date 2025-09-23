const PageHeading = ({ title, subtitle }) => {
    return (
        <div className="mb-6">
            <h1 className="text-left text-bold text-3xl pb-2">{title}</h1>
            <p className="text-md text-left">{subtitle}</p>
        </div>
    )
}

export default PageHeading;