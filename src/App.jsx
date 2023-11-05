import styles from './App.module.scss'
import DocxToHtmlParser from './HtmlParser'

function App() {
	return (
		<>
			<div className={styles.html}>
				<DocxToHtmlParser />
			</div>
		</>
	)
}

export default App
