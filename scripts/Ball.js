class Ball {
    constructor(radius, starting_position, speed, direction) {
        this.radius = radius // radius in pixels
        this.x = starting_position[0]
        this.y = starting_position[1]
        this.speed = speed // speed in px/s
        this.direction = direction // left or right, -1 and 1 respectively
    }

    run_physics = (delta_time, canvas) => {
        if (this.x + this.radius >= canvas.width) {
            this.direction = -1
            this.x = canvas.width - this.radius
        } else if (this.x - this.radius <= 0) {
            this.direction = 1
            this.x = 0 + this.radius
        }
        const speed = this.speed * delta_time * this.direction
        this.x += speed
    }

    render = (context) => {
        context.fillStyle = "#000"
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        context.fill()
    }
}