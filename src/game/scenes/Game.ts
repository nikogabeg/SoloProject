/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import { EventBus } from '../EventBus';
/* END-USER-IMPORTS */

export default class Game extends Phaser.Scene {
	
	private rainbowText!: Phaser.GameObjects.Text;
	private producedItemCount: number = 0;
    private item1Count: number = 0;
    private item2Count: number = 0;
    private countText!: Phaser.GameObjects.Text;
    private item1Text!: Phaser.GameObjects.Text;
    private item2Text!: Phaser.GameObjects.Text;
	
	constructor() {
		super("Game");

		/* START-USER-CTR-CODE */
		// Write your code here.
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

	preload() {
        // Load the image for the produced item
        this.load.image('Item', 'assets/star.png'); // Make sure the file path is correct
        this.load.image('Model_1','assets/Model_1.png');
        this.load.image('Inventory','assets/8bitBox_1.png');
    }

	editorCreate(): void {

		// background
        this.add.image(960, 540, "background_1").setScale(.4, .38);

        
        this.add.image(1100, 600, "Item").setScale(.8, .8);
        this.add.image(850, 520, "Inventory").setScale(.8, .55);
        this.add.image(842, 460, "Item").setScale(.9, .9);

        

		 // "Back" button to return to MainMenu
		 const backButton = this.add.image(1650, 100, "Back")
		 	.setScale(0.35,0.3)
    		.setOrigin(0.2)
    		.setInteractive();


		backButton.on('pointerdown', () => {
            this.cameras.main.fadeOut(800);
            const fxCamera = this.cameras.main.postFX.addPixelate(-1);

            this.add.tween({
                targets: fxCamera,
                duration: 1200, // Slower pixelation duration
        		amount: 40,     // Gradually increase pixelation for smoother transition
        		ease: 'Linear', // Smooth, linear increase in pixelation
        		onComplete: () => {
					this.cameras.main.fadeOut(100);
                    this.scene.start("MainMenu"); // Go back to the MainMenu scene
                }
            });
    
            
        });

        this.events.emit("scene-awake");
	}


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
            duration: 7000, // 1 second animation
            ease: 'Power1',
            onComplete: () => {
                floatingText.destroy(); // Destroy the text after the animation
            }
        });
    }
	/* START-USER-CODE */

	// Write your code here

	create() {

        this.editorCreate();

        this.cameras.main.setBackgroundColor(0x00ff00);

        EventBus.emit('current-scene-ready', this);

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

        this.tweens.add({
            targets: this.rainbowText,
            y: 230,
            duration: 2500,
            ease: 'Sine.easeInOut',
            loop: -1,
            yoyo: true
        });

        const model = this.add.image(950, 700, "Model_1").setScale(.1, .1);
        this.tweens.add({
            targets: model,
            y: 660,
            duration: 2500,
            ease: 'Sine.easeInOut',
            loop: -1,
            yoyo: true
        });

	}

    changeScene ()
    {
        this.scene.start('GameOver');
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
