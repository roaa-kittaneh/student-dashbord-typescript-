import { useState } from 'react';

type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

/**
 * Generic form state hook.
 * Requires each <input> to have a `name` attribute matching a key in initialValues.
 *
 * Usage:
 *   const { values, handleChange, reset } = useForm({ name: '', email: '' });
 *   <input name="name" value={values.name} onChange={handleChange} />
 */
function useForm<T extends Record<string, string>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const reset = () => setValues(initialValues);

  return { values, handleChange, reset };
}

export default useForm;
