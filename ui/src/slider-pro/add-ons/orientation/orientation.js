class Orientation {

    // The namespace to be used when adding event listeners
    namespace = 'orientation';

    // Reference to the base slider instance
    slider;

    // Indicates the current orientation
    orientation = 'horizontal';

    constructor( slider ) {
        this.slider = slider;
        
        this.slider.addEventListener( 'beforeInit.' + this.namespace, () => {
            this.init();
        });
    }

    init() {
        this.slider.addEventListener( 'beforeResize.' + this.namespace, () => {
            const newOrientation = window.innerWidth > ( window.innerHeight - 80 ) ? 'horizontal' : 'vertical';
            if ( newOrientation !== this.orientation ) {
                this.slider.settings.orientation = newOrientation;
				this.orientation = newOrientation;				
                this.slider.update();
            }
        } );
    }

    destroy() {
        this.slider.removeEventListener( 'beforeInit.' + this.namespace );
        this.slider.removeEventListener( 'beforeResize.' + this.namespace );
    }
}

export default Orientation;