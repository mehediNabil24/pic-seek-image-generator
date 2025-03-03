const Generate = () => {
  //0f95c73491521a674b899e4dc68540d9a1d84a28dbf0f31c40bde50774ba829f48609442ec76d1e00fcf364ca084ec7a

  const handleSubmit = (e) => {
    e.preventDefault();
    const prompt = e.target.prompt.value;
    const form = new FormData();
    form.append("prompt", prompt);
    fetch("https://clipdrop-api.co/text-to-image/v1", {
      method: "POST",
      headers: {
        "x-api-key": import.meta.env.VITE_CD_KEY,
      },
      body: form,
    })
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        console.log(buffer);
        const blob = new Blob([buffer], { type: "image/png" });
        const url = URL.createObjectURL(blob);
        console.log(url);
      });
  };
  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-center text-2xl font-bold">Generate an Image</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full flex justify-center items-center pt-10"
      >
        <div className="join">
          <input
            type="text"
            name="prompt"
            placeholder="username@site.com"
            className="input input-bordered join-item w-full"
          />
          <button type="submit" className="btn btn-primary join-item">
            Generate
          </button>
        </div>
      </form>
    </div>
  );
};

export default Generate;