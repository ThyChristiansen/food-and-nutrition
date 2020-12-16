





SELECT id, p.content AS post_content, u.user_array
FROM   posts      p
LEFT JOIN  ( 
   SELECT pu.post_id AS id, array_agg(u.name) AS user_array
   FROM   likes pu
   JOIN   "user"       u  ON u.id = pu.user_who_liked
   GROUP  BY pu.post_id
   ) u USING (id);