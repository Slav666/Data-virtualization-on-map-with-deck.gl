interface Props {
  layers: any;
  toggleLayer: any;
}

const SidePanel = (props: Props) => {
  return (
    <>
      {props.layers.map((layer: any) => {
        return (
          <div
            className="mt-2 flex cursor-pointer items-center rounded-md p-2.5 px-4 duration-300  hover:bg-blue-600"
            key={layer.id}
          >
            <input type="checkbox" id="text-layer" onChange={() => props.toggleLayer(layer.id)} />
            <span className="ml-4 text-[15px] text-gray-200">{layer.id}</span>
          </div>
        );
      })}
    </>
  );
};
export default SidePanel;
