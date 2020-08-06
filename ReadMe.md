# sample of a crud Interface:
consumes the api https://www.football-data.org and formats the contents to a interface crud: create - read - update - delete.
 
## thanks R/A fullstack bootcamp:
https://argentinaprograma.com/

/**
 *  -CRUD~MODALS  
 *  
 *     ~DI: RENDERS WHATEVER HAS BEEN PASSED.
 *     ~BO: IT HAS LOGIC.
 *     ~CE: NOT READ ONLY. 
 *        
 *        CRUD       **          C R U D
 *        1000       **      DI  1 1 1 0
 *        0100       **      BO  1 0 1 1
 *        0010       **      CE  1 0 1 0  
 *        0001       **           
 *      
 *            DELETE                 READ                   CREATE                 UPDATE
 *      * * * * * * * * * *    * * * * * * * * * *   * * * * * * * * * *   * * * * * * * * * *
 *      *         X-CLOSE *    *         X-CLOSE *   *         X-CLOSE *   *         X-CLOSE *
 *      *                 *    *                 *   *                 *   *                 *    
 *      *     WHATEVER?   *    *    KEY&&VAL     *   *    KEYS&&""     *   *   KEYS&&"VALS"  *
 *      *                 *    *    DIVS         *   *    INPUTS       *   *   INPUTS        *
 *      *  SAVE    CLOSE  *    *       CLOSE     *   *  SAVE    CLOSE  *   *  SAVE    CLOSE  *
 *      * * * * * * * * * *    * * * * * * * * * *   * * * * * * * * * *   * * * * * * * * * *
 *  
 *  THIS IS THE ONLY COMMOM STATE:      
 *                                         * * * * * * * * * * 
 *                                         *         X-CLOSE * 
 *                                         *                 * 
 *                                         *                 * 
 *                                         *                 * 
 *                                         *                 * 
 *                                         * * * * * * * * * *  
 *  Logics:
 * 
 *  Delete: 
 *      Captures the target component id, and if confirm, issue an order for deletion.
 *      
 *      These dumps a dataset of the component in the modal:
 *  Read:  
 *      It needs to cherry pick a footer without a save buttom and a body without inputs.
 *  Create and Update:
 *      Problably they should execute the same, record the state of the fields and issue an order to reeplace.
 *      
 *                                       
 * / */