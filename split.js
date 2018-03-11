// const path = '/Folder/Folder1/Folder3'
const path = '/'
let breadcrumbs = []

let parts = path.split('/').filter((x, i, a) => a.indexOf(x) === i)

for (let i = 0; i < parts.length; i++) {
  const label = parts[i] || 'Home'
  const path = parts.slice(0, i + 1).join('/') || '/'
  const icon = i === 0 ? 'home' : null
  breadcrumbs.push({
    label,
    path,
    icon
  })
}

console.log(breadcrumbs)

