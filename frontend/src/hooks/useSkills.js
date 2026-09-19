import { useState, useEffect } from 'react';
import { skillService } from '../services/skillService';

export function useSkills(employeeId = 'emp-101') {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    skillService.getEmployeeSkills(employeeId)
      .then(data => {
        if (mounted) setSkills(data);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [employeeId]);

  return { skills, loading, setSkills };
}
