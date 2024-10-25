// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import { EventBus } from '../EventBus';
/* END-USER-IMPORTS */

export default class MainMenu extends Phaser.Scene {

    private rainbowText!: Phaser.GameObjects.Text;

    constructor() {
        super("MainMenu");

        /* START-USER-CTR-CODE */
        // Initialize variables if necessary
        /* END-USER-CTR-CODE */
    }
    init ()
    {
        this.cameras.main.fadeIn(100);
        const fxCamera = this.cameras.main.postFX.addPixelate(40);
        this.add.tween({
            targets: fxCamera,
            duration: 700,
            amount: -1,
        });
    }

    editorCreate(): void {

        // background
        this.add.image(960, 540, "background_1").setScale(.4, .38);

        // Text with Multi-Color Tint
        this.rainbowText = this.add.text(160, 200, "I & u", {
            fontSize: '38px',
            fontFamily: "White",
            color: "#ffffff", // Base color; tint will override this
            align: "center",
        });

        // Apply the multi-color tint to the text itself
        this.rainbowText.setTint(0xff9dd5, 0xd8a7c3, 0xf4c64a, 0xe49cff);
        this.rainbowText.setStroke("#b7a5ca",5);
        this.rainbowText.setOrigin(-8.2, 2);

        // "Play" button
        const playButton = this.add.image(820, 500, "Play")
		 	.setScale(0.5,0.5)
    		.setOrigin(0.2)
    		.setInteractive();

        // Event listener for "Play" button with pixelated transition
        playButton.on('pointerdown', () => {
            this.cameras.main.fadeOut(800);
            const fxCamera = this.cameras.main.postFX.addPixelate(-1);

            this.add.tween({
                targets: fxCamera,
                duration: 1200, // Slower pixelation duration
                amount: 80,     // Gradually increase pixelation for smoother transition
                ease: 'Linear', // Smooth, linear increase in pixelation
                onComplete: () => {
                    this.cameras.main.fadeOut(100);
                    this.scene.start("Game"); // Start the Game scene when transition completes
                }
            });
        });

        this.events.emit("scene-awake");
    }


    /* START-USER-CODE */
    logoTween: Phaser.Tweens.Tween | null = null;


    create() {
        this.editorCreate();

        EventBus.emit('current-scene-ready', this);
    }

    update() {
        // No stroke or outline animation needed, only keep the text tint
    }
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { MainMenu };
