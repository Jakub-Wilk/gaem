class Game {
    constructor(canvas, levels) {
        this.canvas = canvas
        this.context = canvas.getContext("2d")
        this.levels = levels
        this.level = this.levels[0]
        this.delta_time = 0 // time the last frame took, in seconds
        this.last_time = 0 // store for last time checked for delta_time
    }

    static to_degrees = radians => radians * (180 / Math.PI)

    static to_radians = degrees => degrees / (180 / Math.PI)

    static angle_between = (point_1, point_2) => Game.to_degrees(Math.atan2(point_1[0] - point_2[0], point_2[1] - point_1[1])) + 180

    static distance_between = (point_1, point_2) => Math.sqrt((point_1[0] - point_2[0]) ** 2 + (point_1[1] - point_2[1]) ** 2)
    
    static to_map_coordinates = coordinates => coordinates.map(n => Math.floor(n / 1000))

    static to_game_coordinates = (coordinates, offset = 0) => coordinates.map(n => n * 1000 + offset)

    process_frame() {
        this.delta_time = (performance.now() - this.last_time) / 1000
        this.last_time = performance.now()
        this.physics_tick()
        this.render_tick()
    }

    physics_tick() {
        
    }

    render_tick() {
        Renderer.clear_screen(this.context)
        Renderer.write(this.context, [2, 20], `FPS: ${Math.round(1/this.delta_time)}`, "black", "20px Montserrat")
    }

    run() {
        this.set_stage()
        const object = this
        requestAnimationFrame(function req_frame() {
            object.process_frame()
            requestAnimationFrame(req_frame)
        })
    }

    set_stage() {
        const level = this.level
        let end_flag = 0
        let view_position
        for (const [index, tile_row] of level.entries()) {
            if (tile_row.includes("start")) {
                this.position = [index, tile_row.indexOf("start")]
                end_flag += 1
            }
            if (tile_row.includes("view")) {
                view_position = [index, tile_row.indexOf("view")]
                end_flag += 1
            }
            if (end_flag == 2) {
                break
            }
        }
        if (end_flag == 1) {
            this.angle = 0
        } else if (end_flag == 2) {
            this.angle = Game.angle_between(this.position, view_position)
        }
        this.position = Game.to_game_coordinates(this.position, 500)
        console.log(this.level.length - Game.to_map_coordinates(this.position)[0])
    }

    check_if_wall(position) {
        if (this.level[position[0]][position[1]] == "wall") {
            return true
        } else {
            return false
        }
    }

    get_distance_to_wall_at(angle) {
        const level = this.level
        const map_position = Game.to_map_coordinates(this.position)
        line_angle = Math.abs(360 - angle) + 90
        a = Math.tan(Game.to_radians(line_angle))
        b = -a * map_position[0] + map_position[1]
        let x, y;
        let boundary;
        let distance = null
        if (Math.abs(a) < 1) {
            if (angle > 0 && angle <= 180) {
                boundary = this.level.length - map_position[0]
            } else {
                boundary = map
            }
            for (x = 0; x <= boundary; x++) {
                y = Math.floor(a * x + b)
                if (this.check_if_wall([x, y])) {
                    distance = Game.distance_between(this.position, [x, y])
                } else {
                    continue
                }
            }
        } else {
            for (y = 0; y <= this.level[0].length - map_position[1]; y++) {
                x = Math.round((y - b) / a)
            }
        }
    }
}