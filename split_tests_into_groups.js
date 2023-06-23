const fs = require('fs')
const path = require('path')

// Read the JSON file
fs.readFile('run_times.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err)
    return
  }

  try {
    const runTimes = JSON.parse(data)

    // Get the attribute names and values as an array of objects
    const attributes = Object.entries(runTimes).map(([name, value]) => ({
      name,
      value,
    }))

    // Sort the attributes by value in descending order
    attributes.sort((a, b) => b.value - a.value)

    const group1 = {}
    const group2 = {}

    let sumGroup1 = 0
    let sumGroup2 = 0

    // Iterate through the sorted attributes and assign them to the groups
    for (const attribute of attributes) {
      if (sumGroup1 <= sumGroup2) {
        group1[attribute.name] = attribute.value
        sumGroup1 += attribute.value
      } else {
        group2[attribute.name] = attribute.value
        sumGroup2 += attribute.value
      }
    }

    // Write group1 to group1.json
    fs.writeFile(
      'group1.json',
      JSON.stringify(group1, null, 2),
      'utf8',
      (err) => {
        if (err) {
          console.error('Error writing to group1.json:', err)
        } else {
          console.log('group1.json created successfully!')
        }
      }
    )

    // Write group2 to group2.json
    fs.writeFile(
      'group2.json',
      JSON.stringify(group2, null, 2),
      'utf8',
      (err) => {
        if (err) {
          console.error('Error writing to group2.json:', err)
        } else {
          console.log('group2.json created successfully!')
        }
      }
    )

    // Read the JSON files
    fs.readFile('group1.json', 'utf8', (err, group1Data) => {
      if (err) {
        console.error('Error reading group1.json:', err)
        return
      }

      fs.readFile('group2.json', 'utf8', (err, group2Data) => {
        if (err) {
          console.error('Error reading group2.json:', err)
          return
        }

        try {
          const group1 = JSON.parse(group1Data)
          const group2 = JSON.parse(group2Data)

          // Move JavaScript files to group1 directory
          moveFilesToGroup('cypress/e2e', 'cypress/e2e/group1', group1)

          // Move JavaScript files to group2 directory
          moveFilesToGroup('cypress/e2e', 'cypress/e2e/group2', group2)
        } catch (error) {
          console.error('Error parsing JSON:', error)
        }
      })
    })
  } catch (error) {
    console.error('Error parsing JSON:', error)
  }
})

function moveFilesToGroup(sourceDir, groupDir, groupData) {
  // Create the group directory if it doesn't exist
  fs.mkdirSync(groupDir, { recursive: true })

  for (const filePath of readAllFiles(sourceDir)) {
    const file = filePath.split('/').slice(-1)[0]

    // Check if the file name exists as a key in the groupData
    if (Object.prototype.hasOwnProperty.call(groupData, file.slice(0, -6))) {
      const destinationDir = path.join(groupDir, file)

      // Move the file to the destination directory
      fs.renameSync(filePath, destinationDir)
      console.log(`Moved ${file} to ${groupDir}`)
    }
  }
}

function* readAllFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true })

  for (const file of files) {
    if (file.isDirectory()) {
      yield* readAllFiles(path.join(dir, file.name))
    } else {
      yield path.join(dir, file.name)
    }
  }
}
