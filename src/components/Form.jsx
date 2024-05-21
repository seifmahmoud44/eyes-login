import { useForm } from "react-hook-form";
const Form = ({ supervisor, service }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="field1">Field 1:</label>
          <input type="text" {...register("field1", { required: true })} />
          {errors.field1 && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="field2">Field 2:</label>
          <input type="text" {...register("field2", { required: true })} />
          {errors.field2 && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="field3">Field 3:</label>
          <input type="text" {...register("field3", { required: true })} />
          {errors.field3 && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <select {...register("category", { required: true })}>
            <option value=""></option>
            <option value="البنية التحتية">البنية التحتية</option>
            <option value="الجاهزية">الجاهزية</option>
            <option value="الاعاشة">الاعاشة</option>
            <option value="التشغيل والصيانة">التشغيل والصيانة</option>
            <option value="اخري">اخري</option>
          </select>
          {errors.category && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea {...register("description", { required: true })}></textarea>
          {errors.description && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="extraField">Extra Field:</label>
          <input
            type="number"
            {...register("extraField", { required: true })}
          />
          {errors.extraField && (
            <span>This field is required and must be a number</span>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
