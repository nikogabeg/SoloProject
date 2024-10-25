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

        // "Play" button
        const playButton = this.add.text(960, 600, "Play", {
            fontSize: '48px',
            fontFamily: "Arial",
            color: "#ffffff"
        }).setOrigin(0.5).setInteractive();

        // Event listener for "Play" button
        playButton.on('pointerdown', () => {
            this.scene.start("Game"); // Start the Game scene when clicked
        });

        
        this.events.emit("scene-awake");
    }


    /* START-USER-CODE */
    logoTween: Phaser.Tweens.Tween | null = null;

    // Added the floating text method here
    displayFloatingText(producedItem: string) {
        const floatingText = this.add.text(1142, 100, `+1 ${producedItem}`, {
            fontSize: '16px',
            color: '#ffffff'
        });

        // Apply tween to animate the text (move up and fade out)
        this.tweens.add({
            targets: floatingText,
            y: floatingText.y - 50, // Move up by 50 pixels
            alpha: 0,  // Fade out the text
            duration: 1000, // 1 second animation
            ease: 'Power1',
            onComplete: () => {
                floatingText.destroy(); // Destroy the text after the animation
            }
        });
    }

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
