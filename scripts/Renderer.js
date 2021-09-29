class Renderer {

    static clear_screen(context) {
        Renderer.draw_rect(context, [0, 0], [context.canvas.width, context.canvas.height], "white")
    }

    static create_line(context, start_position, end_position) {
    }

    static draw_line(context, start_position, end_position, width, color) {
        context.beginPath()
        context.strokeStyle = color
        context.lineWidth = width
        context.moveTo(start_position[0], start_position[1])
        context.lineTo(end_position[0], end_position[1])
        Renderer.create_line(context, start_position, end_position)
        context.stroke()
    }

    static draw_rect(context, position, size, color) {
        context.fillStyle = color
        context.rect(position[0], position[1], size[0], size[1])
        context.fill()
    }

    static draw_quadrangle(context, positions, stroke_color, stroke_thickness, fill_color) {
        context.beginPath()
        context.strokeStyle = stroke_color
        context.lineWidth = stroke_thickness
        context.fillStyle = fill_color
        context.moveTo(positions[0][0], positions[0][1])
        context.lineTo(positions[1][0], positions[1][1])
        context.lineTo(positions[2][0], positions[2][1])
        context.lineTo(positions[3][0], positions[3][1])
        context.closePath()
        context.fill()
        context.stroke()
    }

    static write(context, position, text, color, font) {
        context.fillStyle = color
        context.font = font
        context.fillText(text, position[0], position[1])
    }
}