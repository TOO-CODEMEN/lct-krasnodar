import mammoth from 'mammoth'
import React, { useState } from 'react'

const DocxToHtmlParser = () => {
	const [htmlContent, setHtmlContent] = useState(null)

	const handleFileUpload = (event) => {
		const file = event.target.files[0]
		const reader = new FileReader()

		reader.onload = async (e) => {
			const result = await mammoth.convertToHtml({ arrayBuffer: e.target.result })
			setHtmlContent(result.value)
		}

		reader.readAsArrayBuffer(file)
	}

	return (
		<div className='html'>
			<input type='file' onChange={handleFileUpload} />
			{htmlContent && <div dangerouslySetInnerHTML={{ __html: htmlContent }} />}
		</div>
	)
}

export default DocxToHtmlParser
