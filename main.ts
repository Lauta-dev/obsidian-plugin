import {
	Notice,
	Plugin,
	Modal,
	App,
	Setting,
	PluginSettingTab,
	Editor,
	MarkdownView,
	TAbstractFile,
} from 'obsidian'
import { metadata } from './src/settings';
import { get } from './src/fetching';
import { tags } from './src/template/tags'
import { general } from './src/template/general'
import { template } from 'src/template';

interface ExamplePluginSettings {
	dateFormat: string;
}

const DEFAULT_SETTINGS: Partial<ExamplePluginSettings> = {
	dateFormat: "YYYY-MM-DD",
};

export default class mi extends Plugin {
	settings: ExamplePluginSettings;


	async onload() {
		await this.loadSettings()

		this.addSettingTab(new SettingTab(this.app, this));

		this.addRibbonIcon('dice', 'print to console', () => {
			new MyModal(this.app).open();
		})

		this.addCommand({
			id: 'sss',
			name: 'saving',
			editorCallback: async (e: Editor, v: MarkdownView) => {
				const oldValue = e.getSelection()
				new Notice(oldValue)

				const clipboard = await window.navigator.clipboard.readText()
				const endJpgOrPng = clipboard.startsWith('http://') || clipboard.startsWith('https://')
				console.log(clipboard)


				if (!endJpgOrPng) {
					new Notice('El enlace tiene que enpezar con http:// o https://')

					return
				}

				const name = await get({ url: clipboard })

				if (!name) {
					return
				}

				const { author, selftext, subreddit_name_prefixed, title, preview, getVideo } = name
				const subredditLink = clipboard.match(/^(https:\/\/www\.reddit\.com\/r\/[^/]+).*$/)![1]

				this.app.vault.createFolder('reddit') //<-- me creo la carpeta
				this.app.vault.create(`reddit/${title}.md`, template({
					author,
					clipboard,
					preview,
					selftext,
					subreddit_name_prefixed,
					subredditLink,
					title,
					name,
					getVideo
				}))
			}
		})
	}

	async onunload() {
	}


	async loadSettings() {
		return this.settings = Object.assign(
			{}, DEFAULT_SETTINGS, await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

export class MyModal extends Modal {
	result: string

	constructor(app: App,) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.createEl('h2', { text: 'Nombre papu' })

		new Setting(contentEl)
			.setName("Name")
			.addText((text) =>
				text.onChange((value) => {
					this.result = value
				})
			)
			.addButton(btn =>
				btn
					.setButtonText('submit')
					.onClick(() => {
						const url = this.result
						const endWithReddit = url.startsWith(metadata.reddit)

						if (endWithReddit) {
							fetching({ url })
							return
						}
						new Notice('El elemento tiene que enpezar con: ' + metadata.reddit)
					}));
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

export abstract class A extends TAbstractFile {

}


export class SettingTab extends PluginSettingTab {

	plugin: ExamplePluginSettings
	value: string

	constructor(app: App, plugin: Plugin) {
		super(app, plugin)
	}

	display() {
		const { containerEl } = this

		containerEl.empty()

		new Setting(containerEl)
			.addText((d) =>
				d
					.setPlaceholder('Tota')
					.onChange(data => {
						this.value = data
					}))

			.setName('Totao')
			.addButton((d) =>
				d
					.setButtonText('Enviar data')
					.onClick(() => {
						const data = this.value

						if (data) {
							new Notice(data)
							return
						}

						new Notice('Tiene que tener un elemento')

					})
			)
	}
}

interface fetchTypes {
	url: string
}

const fetching = async ({ url }: fetchTypes) => {
	await get({ url })
}

