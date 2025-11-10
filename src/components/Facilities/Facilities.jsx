import './Facilities.css';

const Facilities = () => {
    // PDF path - place the PDF at public/assets/facilities.pdf
    const pdfPath = '/assets/facilities.pdf';

    return (
        <section className="facilities-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Facilities</h2>
                    <p className="section-subtitle">Overview of our laboratory facilities. View or download the PDF below.</p>
                </div>

                <div className="facilities-content">
                    <div className="pdf-wrapper" role="region" aria-label="Facilities PDF">
                        <iframe
                            src={pdfPath}
                            title="Facilities PDF"
                            className="pdf-frame"
                        />
                        <div className="pdf-actions">
                            <a href={pdfPath} download className="btn download-btn">Download PDF</a>
                            <a href={pdfPath} target="_blank" rel="noopener noreferrer" className="btn open-btn">Open in New Tab</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Facilities;