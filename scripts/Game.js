class Game {
    constructor(canvas, levels) {
        this.canvas = canvas
        this.context = canvas.getContext("2d")
        this.levels = levels
        this.objects = []
        this.delta_time = 0 // time the last frame took, in seconds
        this.last_time = 0 // store for last time checked for delta_time
    }

    add_object(object) {
        this.objects.push(object)
    }

    process_frame() {
        this.delta_time = (performance.now() - this.last_time) / 1000
        this.last_time = performance.now()
        this.physics_tick()
        this.render_tick()
    }

    physics_tick() {
        for (const object of this.objects) {
            object.run_physics(this.delta_time, this.canvas)
        }
    }

    render_tick() {
        this.context.fillStyle = "white"
        this.context.rect(0, 0, this.canvas.width, this.canvas.height)
        this.context.fill()
        this.context.fillStyle = "black"
        this.context.font = "20px Montserrat"
        this.context.fillText(`FPS: ${Math.round(1/this.delta_time)}`, 1, 20)
        for (const object of this.objects) {
            object.render(this.context)
        }
    }

    run() {
        this.set_stage(1)
        const object = this
        requestAnimationFrame(function req_frame() {
            object.process_frame()
            requestAnimationFrame(req_frame)
        })
    }

    set_stage() {
        
    }
}