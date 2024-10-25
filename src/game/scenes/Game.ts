/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import { EventBus } from '../EventBus';
/* END-USER-IMPORTS */

export default class Game extends Phaser.Scene {
	
	private rainbowText!: Phaser.GameObjects.Text;
	
	constructor() {
		super("Game");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// background
        this.add.image(960, 540, "background_1").setScale(.4, .38);

        // Text with Multi-Color Tint
        this.rainbowText = this.add.text(200, 200, "I & u", {
            fontSize: '38px',
            fontFamily: "White",
            color: "#ffffff", // Base color; tint will override this
            align: "center",
        });

        // Apply the multi-color tint to the text itself
        this.rainbowText.setTint(0xff9dd5, 0xd8a7c3, 0xf4c64a, 0xe49cff);
        this.rainbowText.setStroke("#b7a5ca",5);
        this.rainbowText.setOrigin(-8.2, 2);

		 // "Back" button to return to MainMenu
		 const backButton = this.add.text(960, 700, "Back", {
            fontSize: '36px',
            fontFamily: "Arial",
            color: "#ffffff",
        }).setOrigin(0.5).setInteractive();


		backButton.on('pointerdown', () => {
            this.scene.start("MainMenu"); // Go back to the MainMenu scene
        });
		
		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

        this.editorCreate();

        this.cameras.main.setBackgroundColor(0x00ff00);

        EventBus.emit('current-scene-ready', this);

	}

    changeScene ()
    {
        this.scene.start('GameOver');
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
