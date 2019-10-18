export default function run(selector, func, attrs = null) {
  let node = document.querySelectorAll(selector);
  if (node.length) {
    func(attrs);
  }
}
