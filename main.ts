import { Editor, MarkdownView, Notice, Plugin, Modal, App, Setting, PluginSettingTab } from 'obsidian'


interface ExamplePluginSettings {
	dateFormat: string;
}

const DEFAULT_SETTINGS: Partial<ExamplePluginSettings> = {
	dateFormat: "YYYY-MM-DD",
};

export default class mi extends Plugin {
	settings: ExamplePluginSettings;


	async onload() {
		new Notice('Plugin activado')
		await this.loadSettings()

		this.addSettingTab(new SettingTab(this.app, this));


		this.addRibbonIcon('dice', 'print to console', () => {
			new MyModal(this.app).open();
		})


	}

	async onunload() {
		new Notice('Plugin desactivado')
	}


	async loadSettings() {
		new Notice('Cargar plugin')

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
				}));


		new Setting(contentEl)
			.addButton(btn =>
				btn
					.setButtonText('submit')
					.onClick(() => {
						new Notice(this.result)
					})

			)
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
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