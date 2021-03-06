interface IColor {
    r: number;
    g: number;
    b: number;
};

interface IVelbase {
    x: number;
    y: number;
};

class Particle {
    private x: number;
    private y: number;
    private vx: number;
    private vy: number;
    private radius: number;
    private color: IColor;
    private opacity: number;
    private ctx: CanvasRenderingContext2D;
    private direction: string;
    private cacheCtx: CanvasRenderingContext2D;
    private isCached = false;
    public constructor(screen: HTMLCanvasElement, color: IColor = null, size = 4) {
        let directions = ['top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left'];
        this.ctx = screen.getContext('2d');
        this.radius = Math.floor(Math.random() * size);
        this.x = Math.floor(Math.random() * screen.width);
        this.y = Math.floor(Math.random() * screen.height);
        this.color = color ? color : this.getRandomColor();
        this.opacity = .4;
        this.direction = directions[Math.floor(Math.random() * (directions.length - 1))];
        this.initVelocity();
        this.initCacheCtx();
    }

    public render(particles: Particle[]) {
        this.move(particles);
        if (!this.isCached) {
            this.cache();
        }

        this.ctx.drawImage(this.cacheCtx.canvas, this.x - this.radius, this.y - this.radius);
    }

    get colorString() {
        return `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
    }

    private cache() {
        this.cacheCtx.fillStyle = this.colorString;
        this.cacheCtx.beginPath();
        this.cacheCtx.arc(this.radius, this.radius, this.radius, 0, Math.PI * 2, false);
        this.cacheCtx.closePath();
        this.cacheCtx.fill();
        this.isCached = true;
    }

    private initCacheCtx() {
        let cacheCanvas = document.createElement('canvas');
        cacheCanvas.width = this.radius * 2;
        cacheCanvas.height = this.radius * 2;
        this.cacheCtx = cacheCanvas.getContext('2d');
    }

    private initVelocity() {
        let velbase: IVelbase;
        switch (this.direction) {
            case 'top':
                velbase = { x: 0, y: -1 };
            break;
            case 'top-right':
                velbase = { x: 0.5, y: -0.5 };
            break;
            case 'right':
                velbase = { x: 1, y: -0 };
            break;
            case 'bottom-right':
                velbase = { x: 0.5, y: 0.5 };
            break;
            case 'bottom':
                velbase = { x: 0, y: 1 };
            break;
            case 'bottom-left':
                velbase = { x: -0.5, y: 1 };
            break;
            case 'left':
                velbase = { x: -1, y: 0 };
            break;
            case 'top-left':
                velbase = { x: -0.5, y: -0.5 };
            break;
            default:
                velbase = { x: 0, y: 0 };
            break;
        }

        this.vx = velbase.x * Math.random();
        this.vy = velbase.y * Math.random();
    }

    private linkTo(p: Particle) {
        let dx = this.x - p.x,
            dy = this.y - p.y,
            opacity = 0.4,
            distance = 90,
            dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= distance) {
            let lineOpacity = opacity - (dist / (1 / opacity)) / distance;
            if (lineOpacity > 0) {
                this.ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${lineOpacity})`;
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.moveTo(this.x, this.y);
                this.ctx.lineTo(p.x, p.y);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        }
    }

    private move(particles: Particle[]) {
        for (let particle of particles) {
            this.linkTo(particle);
        }
        this.vx = (this.x + this.radius > this.ctx.canvas.width || this.x < 0) ? -this.vx : this.vx;
        this.vy = (this.y + this.radius > this.ctx.canvas.height || this.y < 0) ? -this.vy : this.vy;
        this.x += this.vx * 7;
        this.y += this.vy * 7;
    }

    private getRandomColor(): IColor {
        return {
            r: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
            g: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
            b: (Math.floor(Math.random() * (255 - 0 + 1)) + 0)
        };
    }

}

class ParticlesApp {
    private screen: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private particles: Particle[] = [];
    constructor(width: number, height: number, num: number) {
        this.screen = this.initRetinaCanvas(width, height);
        this.ctx = this.screen.getContext('2d');
        this.initParticles(num);
    }

    public run() {
        document.body.insertAdjacentElement('afterbegin', this.screen);
        this.render();
    }

    private initParticles(num: number) {
        let color = { r: 255, g: 255, b: 255 };
        for (let i = 0; i < num; i++) {
            this.particles.push(new Particle(this.screen, color));
        }
    }

    private render = () => {
        this.ctx.clearRect(0, 0, this.screen.width, this.screen.height);
        for (let particle of this.particles) {
            particle.render(this.particles);
        }
        requestAnimationFrame(this.render);
    }

    private initRetinaCanvas(width: number, height: number) {
        let canvas = document.createElement('canvas');
        let dpr = window.devicePixelRatio || 1;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        return canvas;
    }
}

const particlesApp = new ParticlesApp(window.innerWidth, window.innerHeight, 300);
particlesApp.run();
