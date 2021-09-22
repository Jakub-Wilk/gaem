const get_file_data_url = (file) => {
    return new Promise((resolve, reject) => {
        const fr = new FileReader()

        fr.onload = () => resolve(fr.result)

        fr.onerror = () => reject(fr)

        fr.readAsDataURL(file)
    })
}

const get_images_from_input = (input) => {
    return new Promise((resolve, reject) => {
        const file_list = input.files
        let images = []

        if (file_list.length == 0) {
            reject("No file selected!")
        } else {
            const arr_file_list = Array.from(file_list)
            let readers = arr_file_list.map(get_file_data_url)

            Promise.all(readers).then(values => {
                values.map((value) => {
                    let image = new Image()
                    image.src = value
                    images.push(image)
                })
                resolve(images)
            })
        }
    })
}

const component_to_hex = (c) => {
    const hex = c.toString(16)
    return hex.length == 1 ? `0${hex}` : hex
}

const rgb_to_hex = (rgb) => `#${rgb.map(component_to_hex).join("")}`

const image_to_level = (image, tilemap) => {
    let canvas = document.createElement("canvas")
    canvas.width = image.width
    canvas.height = image.height
    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, image.width, image.height)
    const image_data = context.getImageData(0, 0, canvas.width, canvas.height)
    const pixel_data = image_data.data
    let level = []
    for (const column of Array(canvas.width).keys()) {
        level.push([])
        for (const row of Array(canvas.height).keys()) {
            const pixel_offset = (row * canvas.width + column) * 4
            let pixel_color = [pixel_data[pixel_offset], pixel_data[pixel_offset + 1], pixel_data[pixel_offset + 2]]
            pixel_color = rgb_to_hex(pixel_color)
            let tile = tilemap["color-to-id"][pixel_color]
            level[column].push(tile)
        }
    }
    return level
}

const download_levels = (levels) => {
    return new Promise((resolve, reject) => {
        try {
            levels.map((level) => {
                const js_content = `const level = ${JSON.stringify(level)}`
                const file = new File([js_content], "level.js", {type: "application/javascript"})
                const url = window.URL.createObjectURL(file)

                let a = document.createElement("a")
                a.style.display = "none"
                a.href = url
                a.download = "level.js"
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
            })
        } catch (error) {
            reject()
        }
        resolve()
    })
}