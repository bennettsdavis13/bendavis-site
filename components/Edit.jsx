export default function Edit({ path, as = 'span', className, children }) {
  const Tag = as;
  return <Tag data-edit={path} className={className}>{children}</Tag>;
}
