export default interface Architecture {
  // Should have an unique name
  name: string;
  path: string;
  imports: string;
  mock?: Array<object>;
}
