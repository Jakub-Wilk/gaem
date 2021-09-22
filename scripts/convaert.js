let testfile

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
            reject([])
        } else {
            const arr_file_list = Array.from(file_list)
            let readers = arr_file_list.map(get_file_data_url)

            Promise.all(readers).then(values => {
                values.map((value) => {
                    let image = new Image()
                    image.src = value
                    images.push(image)
                })
                console.log("returning")
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

const convert_to_tilemap = (image) => {
    
}

// const download_json = (button, json) => {
//     const tilemap = []

//     const json = JSON.stringify(tilemap)
//     const file = new File([json], "file.json", {type: "application/json"})
//     const url = window.URL.createObjectURL(file)

//     let a = document.createElement("a")
//     a.style.display = "none"
//     a.href = url
//     a.download = "test.json"
//     document.body.appendChild(a)
//     a.click()
//     document.body.removeChild(a)
// }